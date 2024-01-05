import { AppDataSource } from './src/data-source'; // atualize com o caminho correto para data-source.ts

AppDataSource.initialize()
  .then(async () => {
    const { exec } = require('child_process');
    exec('npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro de execução: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  })
  .catch(error => console.error('Erro durante a inicialização do DataSource:', error));


