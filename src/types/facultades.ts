// types/facultades.ts
export interface Programa {
    id: string;
    nombre: string;
    semestres: number;
    tipo: string;
  }
  
  export interface Facultad {
    id: string;
    nombre: string;
    programas: Programa[];
  }
  
  export interface FacultadesData {
    facultades: Facultad[];
  }