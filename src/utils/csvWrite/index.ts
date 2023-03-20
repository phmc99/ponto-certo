import { createObjectCsvWriter } from 'csv-writer';

const createCsvWriter = createObjectCsvWriter;

export const csvWrite = async (body: any[]) => {
  const csvWriter = createCsvWriter({
    path: `./src/utils/temp/data.csv`,
    header: [
      { id: 'name', title: 'Colaborador' },
      { id: 'cpf', title: 'Cpf' },
      { id: 'sector', title: 'Setor' },
      { id: 'type', title: 'Tipo' },
      { id: 'date', title: 'Ponto' },
      { id: 'updateDate', title: 'Data de atualizacao' },
      { id: 'updateMessage', title: 'Mensagem de atualizacao' },
    ],
  });

  await csvWriter.writeRecords(body);
};
