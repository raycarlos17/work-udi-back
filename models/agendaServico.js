const mongoose = require("mongoose");
const Schema = mongoose.Schema; //a biblioteca mongoose tem o schema para permitir tipagem dos dados e modelagem

const agendaServicoModel = new Schema(
  {
    nameWorker: {
      type: String,
      required: true,
    },
    nameUser: {
      type: String,
      required: false,
    },
    data: {
      type: String,
      unique: false,
      required: true,
    },
    start: {
      type: String,
      unique: false,
      required: true,
    },
    end: {
      type: String,
      unique: false,
      required: true,
    },
    title: {
      type: String,
      unique: false,
      required: false,
    },
    allDay: {
      type: String,
      unique: false,
      required: false,
    },
    id: {
      type: String,
      unique: false,
      required: true,
    },
  },
  { _id: true, collection: "agendaServico" }
);

module.exports = mongoose.model("agendaServico", agendaServicoModel);
