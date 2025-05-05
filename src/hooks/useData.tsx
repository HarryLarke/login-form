import { useContext } from "react";
import DataContext from "../context/dataProvider";

const useData = () => {
    const context = useContext(DataContext)
    if(!context) {
        throw new Error ("useData must be done within the DataProvider")
    } else return context
}

export default useData