
function Circle({className=" "}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-10 h-10 m-2 opacity-30 hover:opacity-100 ${className}`}>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="none" stroke='url(#gradient)' />
        </svg>
    )
}

export default Circle