export default function Tooltip({ children, content }) {
    return(
        <div className="relative inline-flex group/tooltip">
            {children}
            <span className="
                absolute
                bottom-full
                left-1/2
                transform
                -translate-x-1/2
                mb-2
                px-2
                py-1
                bg-gray-800
                text-white
                text-sm
                rounded
                whitespace-nowrap
                opacity-0
                group-hover/tooltip:opacity-100
                transition-opacity
                pointer-events-none
            ">
                {content}
            </span>
        </div>
        
    );
}