export function TaloFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-8 container-padding-x">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Talo Star pure mineral water from Diinsoor, Somalia
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  5L Bottles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Quality
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© {currentYear} Talo Star – Pure Mineral Water. All rights reserved.</p>
          <div className="flex gap-4 text-slate-400">
            <span>Made with care in Somalia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
