import { Link } from "react-router"

const Missing = () => {
  return (
    <>
        <h1>Page Missing</h1>

        <section>
            <h2>Please return <Link to={'/'}>Home</Link></h2>
        </section>
</>

  )
}

export default Missing
