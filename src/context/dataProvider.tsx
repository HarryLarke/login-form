import { createContext, useState, ReactNode, SetStateAction  } from "react";

interface Data {
    employeeName : string
}

interface DataContentType {
    employeeNames: Data
    setEmployeeNames: React.Dispatch<SetStateAction<Data>>
}

interface DataProviderProps {
    children : ReactNode
}

const DataContext = createContext<DataContentType | undefined>(undefined)

export const DataProvider = ({children}: DataProviderProps) => {
    const [ employeeNames, setEmployeeNames] = useState<Data>({employeeName:''})

    return(
        <DataContext.Provider value={{employeeNames, setEmployeeNames}}>{children}</DataContext.Provider>
    )

}

export default DataContext