interface prop {
   loadOn: boolean
}

const Loading = ({ loadOn }: prop) => {
   if (!loadOn) return null
   return (
      <div className="flex items-center justify-center h-screen">
         <div className="relative">
            <div
               className="w-16 h-16 border-4 border-transparent rounded-full animate-spin border-t-transparent [border-image:linear-gradient(to_right,#2dd8fa,#26c0e0)_1]"
            ></div>

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#2dd8fa] to-[#26c0e0] bg-clip-text text-transparent">
               Loading...
            </div>
         </div>
      </div>
   );
};

export default Loading;