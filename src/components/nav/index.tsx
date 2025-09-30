import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Nav() {
  const pathname = usePathname()
  const activeClass = {
    active: 'text-blue-800'
  }
 
  return (
    <nav className=' flex justify-center items-center gap-2'>
      <Link className={`link ${pathname === '/' ? activeClass.active : ''}`} href="/">
        Home
      </Link>
 
      <Link
        className={`link ${pathname === '/favorites' ? activeClass.active : ''}`}
        href="/favorites"
      >
        Favoritos
      </Link>
    </nav>
  )
}