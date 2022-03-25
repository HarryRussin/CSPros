import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

//client
function signin({ providers }) {
    const history = useRouter()
    return (
        <>
            <Header selectedlink={'login'} />

            <div className="bg-black h-screen">
                <div className="max-w-4xl xl:max-w-6xl mx-auto text-center text-white pt-16">
                    <p className='text-4xl py-5'>Sign In and become a <span className='text-yellow-500 font-semibold'>CSPro</span></p>
                    <hr className='py-1 pb-6' />
                    <div className="flex justify-center md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-5">
                        {Object.values(providers).map((provider) => (
                            <div className='' key={provider.name}>
                                <button className='py-5 px-8 hover:bg-yellow-400 transition-all bg-yellow-500 rounded-lg text-white' onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}>
                                    Sign in with <span className='font-bold'>{provider.name}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className='text-yellow-500 px-10 py-3 text-3xl font-bold'>OR</p>
                    <button onClick={() => history.replace('/join-us')} className='py-5 px-14 text-xl font-semibold text-ellipsis hover:bg-purple-400 transition-all bg-purple-500 rounded-lg text-white'>Join Us</button>
                </div>
            </div>
            <Footer />
        </>
    )
}


//Server
export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

export default signin
