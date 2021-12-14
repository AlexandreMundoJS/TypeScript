import App from './App';
const port: Number = 5000;

App.express.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})