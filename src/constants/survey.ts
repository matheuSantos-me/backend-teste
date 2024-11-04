export enum AppError {
  INTERNAL_SERVER_ERROR = "Error Interno do Servidor.",
  CREATE_SURVEY_ERROR = "Error ao salvar uma nova pesquisa.",
  FILE_NOT_SEND_ERROR = "Nenhum arquivo foi enviado.",
  FILE_SEND_NOT_CSV_ERROR = "Arquivo enviado não é um CSV.",
  PROCESS_CSV_ERROR = "Erro ao processar o arquivo CSV.",
  CALC_VOTING_INTENTION_ERROR = "Error ao calcular intenção de votos.",
}

export enum AppMessages {
  CREATE_SURVEY_SUCCESS = "Pesquisa salva com sucesso.",
  CALC_VOTING_INTENTION_SUCCESS = "Intenção de votos calculadas com sucesso.",
}
