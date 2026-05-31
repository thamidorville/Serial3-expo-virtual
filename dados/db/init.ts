import { SQLiteDatabase } from "expo-sqlite";

import { SCHEMA_SQL } from "./schema";
import { SEED_SQL } from "./seed";

export const inicializarBancoDeDados = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(`${SCHEMA_SQL}\n${SEED_SQL}`);
  } catch (error) {
    console.error("Erro ao inicializar database:", error);
  }
};