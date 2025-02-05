
export interface Message {
    id?: number
    conversationId: number	
    expediteurId: number	
    expediteurType: "PATIENT" | "MEDECIN" 	
    contenu: string	
    dateEnvoi: Date	
    seen: boolean	
    pieceJointe?: string
}