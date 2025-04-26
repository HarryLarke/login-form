import { Link } from "react-router"

const unauthorized = () => {
  return (
    <main>
        <section>
            <h1>Authorised</h1>
            <p>Your Role does NOT allow your access to this page...</p>
            <p>Please return to <Link to='/home'>Home</Link></p> 
        </section>
    </main>
      
    
  )
}

export default unauthorized
