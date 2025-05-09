import { createContext, useState, ReactNode, SetStateAction  } from "react";

//Implementing it as an array!
interface Employee {
        id: string
        firstname: string
        lastname: string
}



interface DataContentType {
    employees: Employee[]
    setEmployees: React.Dispatch<SetStateAction<Employee[]>>
    firstname: string
    setFirstname: React.Dispatch<SetStateAction<string>>
    lastname: string
    setLastname: React.Dispatch<SetStateAction<string>>
}

interface DataProviderProps {
    children : ReactNode
}

const DataContext = createContext<DataContentType | undefined>(undefined)

export const DataProvider = ({children}: DataProviderProps) => {
    const [ employees, setEmployees] = useState<Employee[]>([])
    const [ firstname, setFirstname ] = useState<string>('') 
    const [ lastname, setLastname ] = useState<string>('') 



    return(
        <DataContext.Provider value={{employees, setEmployees, firstname, setFirstname, lastname, setLastname}}>{children}</DataContext.Provider>
    )

}

export default DataContext