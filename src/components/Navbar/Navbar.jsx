import './Navbar.css'
import { ConnectWallet, GetDataUser } from '../../Services/funcServices'
import { useEffect, useState } from 'react'

function ShortWallet(walletUser) {
    return walletUser.slice(0, 6) + "..." + walletUser.slice(walletUser.length - 4);
}

const Navbar = ({ setUserData, wallet, setWallet }) => {
    const [shortWallet, setShortWallet] = useState('')

    useEffect(() => {
        if (wallet) {
            setShortWallet(ShortWallet(wallet));
        }
    }, [wallet]);

    return (
        <div className="navbar-main">
            <button
                className='navbar-button'
                onClick={async () => {
                    const connectedWallet = await ConnectWallet();
                    setWallet(connectedWallet);
                }}
            >
                Connect Wallet
            </button>
            <div
                className='navbar-wallet-data'
                onClick={() => {
                    if (wallet) {
                        navigator.clipboard.writeText(wallet);
                        alert("The wallet was copied");
                    }
                }}
            >
                {!wallet ?
                    <>Wallet is not connect</>
                    :
                    <>
                        Wallet: {shortWallet}
                    </>
                }
            </div>
            <div className='navbar-button'>
                <button
                    onClick={async () => {
                        const data = await GetDataUser(wallet);
                        setUserData(data)
                    }}
                >
                    GetUserData
                </button>
            </div>
        </div>
    )
}

export default Navbar