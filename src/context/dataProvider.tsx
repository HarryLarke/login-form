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
}

interface DataProviderProps {
    children : ReactNode
}

const DataContext = createContext<DataContentType | undefined>(undefined)

export const DataProvider = ({children}: DataProviderProps) => {
    const [ employees, setEmployees] = useState<Employee[]>([])

    return(
        <DataContext.Provider value={{employees, setEmployees}}>{children}</DataContext.Provider>
    )

}

export default DataContext