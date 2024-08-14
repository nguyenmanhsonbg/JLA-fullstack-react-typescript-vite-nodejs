export default function AboutFooter() {
  return (
    <div>
      <nav className="grid gap-4 text-sm text-muted-foreground text-[#657e50]">
        <a href="#" className="font-semibold text-primary">
          Về DNLS
        </a>
        <a href="/policy" className="text-[#69ad32]">Điều khoản sử dụng</a>
        <a href="/security" className="text-[#69ad32]">Chính sách bảo mật</a>
        <a href="/aboutDNLS" className="text-[#69ad32]">Về trang web</a>
      </nav>
    </div>
  );
}
