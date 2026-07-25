import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O Next bloqueia recursos de dev (`/_next/*`) vindos de origem diferente da
  // usada para abrir a página. Sem isto, acessar o app por 127.0.0.1 devolve 403
  // nos chunks, a página não hidrata e os formulários caem no submit nativo.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
