import Image from 'next/image';

export function StudioLogo(props: any) {
    const { renderDefault, title } = props;

    return (
        <div className="flex items-center gap-2">
            {/* 
        Custom Logo Area 
        Using simple text styling for now to match the "Serif Gold" brand 
      */}
            <div className="font-serif text-xl font-bold text-[#d4af37] tracking-widest uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>
                Visual Eyes
            </div>

            {/* Optional: Render default sanity logic if needed, usually we replace it entirely or append */}
            {/* {renderDefault(props)} */}
        </div>
    );
}
