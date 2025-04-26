const Home = () => {
    //Could have a conditional variable to send you to the specific pages, based on roles, access, etc. 
    //This will still require access control on the router. 
    //Make sure that roles are sent via cookies! Don't be sending lots info in the JS concerning roles!
  return (
    <main>
        <h1>Home Page</h1>
        <section>
            <p>Please choose a page:</p>
            <ul></ul>
        </section>
    </main>
  )
}

export default Home
