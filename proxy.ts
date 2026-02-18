import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    // اول حاجة اجيب المسار الحالى الللى احنا فيه عشان اعرف احنا فى صفحة ادمن ولا لا
    const path = request.nextUrl.pathname;

    //هنا بقا اشوف هل المسار بتاع ادمن يعنى بيبدا ب (/admin)
    const isAdminRoute = path.startsWith('/admin');

    // بعد كدا هجيب التوكن من الكوكيز
    const token = request.cookies.get('wanderlust_jwt')?.value;

    // بعد ماجيبت التوكن بشوف بقا هل دا صفحة ادمن وكمان بشوف هل التوكن فعلا موجود ولو موجود هل هو ادمن فعلا ام يوزر عادى
    if (isAdminRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getMe`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `wanderlust_jwt=${token}`,
            },
        });

        if (res.ok) {
            const userData = await res.json();
            if (userData.data.user.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } else {
            // التوكن موجود بس الباك إند رفضه → redirect للـ login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
}