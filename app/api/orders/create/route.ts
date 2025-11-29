import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const {
      items,
      totalAmount,
      shippingFee = 0,
      discountAmount = 0,
      finalAmount,
      fullName,
      email,
      phone,
      address,
      city,
      district,
      ward,
      note,
      paymentMethod,
    } = body;

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Generate short numeric order code: RF<6 digits> (e.g. RF123456)
    // RF = Refurbish, Random 6-digit number to reduce collision
    const sixDigits = (Math.floor(Math.random() * 900000) + 100000).toString();
    const orderNumber = `RF${sixDigits}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: 'pending',
        payment_status: paymentMethod === 'cod' ? 'pending' : 'pending', // Mặc định là pending cho tất cả
        total_amount: totalAmount,
        shipping_fee: shippingFee,
        discount_amount: discountAmount,
        final_amount: finalAmount,
        full_name: fullName,
        email: email || null,
        phone,
        address,
        city,
        district,
        ward,
        note: note || null,
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError.message },
        { status: 500 }
      );
    }

    // Create order items
    if (items && items.length > 0) {
      console.log('Raw items received:', JSON.stringify(items, null, 2));
      
      const orderItems = items.map((item: any) => {
        const price = item.product?.price || item.price || 0;
        // Get the actual product_id from variants array if available
        const productId = item.product?.variants?.[0]?.product_id || item.product?.product_id || item.product_id;
        
        console.log('Processing item:', {
          productId,
          price,
          quantity: item.quantity,
          hasVariants: !!item.product?.variants,
          rawItem: item
        });
        
        if (!productId) {
          throw new Error('Product ID is missing from item');
        }
        
        return {
          order_id: order.id,
          product_id: productId,
          quantity: item.quantity,
          price: price,
          subtotal: price * item.quantity,
        };
      });

      console.log('Order items to insert:', JSON.stringify(orderItems, null, 2));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        console.error('Order items data:', orderItems);
        // Rollback order if items fail
        await supabase.from('orders').delete().eq('id', order.id);
        return NextResponse.json(
          { error: 'Failed to create order items', details: itemsError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_number: order.order_number,
      },
    });
  } catch (error: any) {
    console.error('Error in create order API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

