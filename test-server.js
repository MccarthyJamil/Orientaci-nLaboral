const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Tu servidor de prueba está funcionando!');
});

server.listen(port, hostname, () => {
  console.log(`Servidor de prueba corriendo en http://${hostname}:${port}/`);
});