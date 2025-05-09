import { createContext, useState, ReactNode, SetStateAction  } from "react";

//Implementing it as an array!
interface Employee {
        id: string
        firstname: string
        lastname: string
}

interface Name {
    firstname : string
    lastname : string
}

interface DataContentType {
    employees: Employee[]
    setEmployees: React.Dispatch<SetStateAction<Employee[]>>
    names: Name[]
    setNames:  React.Dispatch<SetStateAction<Name[]>>
}

interface DataProviderProps {
    children : ReactNode
}

const DataContext = createContext<DataContentType | undefined>(undefined)

export const DataProvider = ({children}: DataProviderProps) => {
    const [ employees, setEmployees] = useState<Employee[]>([])
    const [ names, setNames ] = useState<Name[]>([])



    return(
        <DataContext.Provider value={{employees, setEmployees, names, setNames}}>{children}</DataContext.Provider>
    )

}

export default DataContext