import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletters')
      .select('id, is_active')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json(
          { success: false, error: 'Email này đã đăng ký rồi' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        const { error } = await supabase
          .from('newsletters')
          .update({ is_active: true, subscribed_at: new Date().toISOString() })
          .eq('id', existing.id);

        if (error) throw error;

        return NextResponse.json({
          success: true,
          message: 'Đã kích hoạt lại đăng ký thành công!',
        });
      }
    }

    // Insert new subscription
    const { error } = await supabase
      .from('newsletters')
      .insert({ email });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Đăng ký nhận bản tin thành công!',
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    );
  }
}
