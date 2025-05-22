export const InfoCard = ({
    title,
    value,
    status,
    statusText,
    extraClasses = ''
}: {
    title: string;
    value: string;
    status: string;
    statusText: string;
    extraClasses?: string;
}) => (
    <div className={`flex flex-col 2xl:flex-row justify-start items-center gap-5 bg-zinc-100 rounded-lg p-4 transition-all ease-in-out ${extraClasses}`}>
        <div>
            <h1 className="font-montserrat text-base md:text-lg text-neutral-dark-400">{title}</h1>
            <p className="text-lg md:text-2xl font-bold font-montserrat text-neutral-dark-400">{value}</p>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs lg:text-sm ${status === 'inactive' ? 'bg-zinc-300 text-neutral-dark-400' : status === 'completed' ? 'bg-lime-100 text-lime-700' : 'bg-blue-100 text-blue-700'}`}>
            {statusText}
        </div>
    </div>
)