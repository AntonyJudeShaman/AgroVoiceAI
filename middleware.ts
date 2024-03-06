export default function Middleware(req: any, res: any, next: any) {
  // Do something

  const { url } = req
  const session = req.session
  if (url === '/sign-in' || (url === '/sign-up' && session.user)) {
    return res.redirect('/chat')
  }

  if (url === '/settings' && !session.user) {
    return res.redirect('/')
  }
}

export const config = {
  matcher: ['/((?!api|settings|_next/image|favicon.ico).+)']
}
