import { Assunto } from "./assuntos";
import { Autor } from "./autores";

export interface Livro {
    id?: any;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    assunto: Assunto;
    autores: Autor[];
}