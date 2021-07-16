import { FuseUtils } from "@fuse/utils";

export class ClienteModel
{
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    estado: number;
    cidade: string;
    data_nascimento: Date;
    plano_id: number;
    created_at?: Date;
    updated_at?: Date;

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};

        this.id = data.id;
        this.nome = data.nome || null;
        this.email = data.email || null;
        this.telefone = data.telefone || null;
        this.estado = data.estado;
        this.cidade = data.cidade || null;
        this.data_nascimento = data.data_nascimento || null;
        this.plano_id = data.plano_id || null;
        this.created_at = new Date(data.created_at) || new Date();
        this.updated_at = new Date(data.updated_at) || new Date();
    }
}
