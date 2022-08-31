
export default function Navbar () {
    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='container'>
                <a className='navbar-brand' href="/">Home</a>
                <button className='navbar-toggler'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item active'>
                            <a className='nav-link' href="/matchups/0">Matchup 0</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}