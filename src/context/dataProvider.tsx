import { createContext, useState, ReactNode, SetStateAction  } from "react";

//Maybe change the data type??
interface Data {
    employee : string,
    id: string
}

interface DataContentType {
    employees: Data
    setEmployees: React.Dispatch<SetStateAction<Data>>
}

interface DataProviderProps {
    children : ReactNode
}

const DataContext = createContext<DataContentType | undefined>(undefined)

export const DataProvider = ({children}: DataProviderProps) => {
    const [ employees, setEmployees] = useState<Data>({employee:''})

    return(
        <DataContext.Provider value={{employees, setEmployees}}>{children}</DataContext.Provider>
    )

}

export default DataContext