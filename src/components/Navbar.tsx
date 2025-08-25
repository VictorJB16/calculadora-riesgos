import { Button } from '@/components/ui/button'

interface NavbarProps {
  currentPath: string
}

export default function Navbar({ currentPath }: NavbarProps) {
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/calculator', label: 'Calculadora' },
    { path: '/about', label: 'Acerca de' }
  ]

  return (
    <nav className="border-b bg-white border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-blue-600">
              Risk-Calcu
            </a>
            <span className="text-sm text-gray-600">
              🇨🇷 Costa Rica
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPath === item.path ? "default" : "ghost"}
                asChild
              >
                <a href={item.path}>{item.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
