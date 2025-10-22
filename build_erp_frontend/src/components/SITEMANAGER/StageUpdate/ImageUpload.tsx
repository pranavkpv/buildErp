import { toast } from "react-toastify"
import { useState } from "react"
import { uploadImageAPI } from "../../../api/Sitemanager/stageStatus"
import Loading from "../../../components/Loading"


type uploadProp = {
   uploadEnable: boolean
   setUploadEnable: React.Dispatch<React.SetStateAction<boolean>>
   uploadStageId: string
}

function ImageUpload({ uploadEnable, setUploadEnable, uploadStageId }: uploadProp) {
   if (!uploadEnable) return null
   const [date, setDate] = useState("")
   const [inputImage, setInputImage] = useState<File[]>([])
   const [count, setCount] = useState([0])
   const [loadOn, setLoadOn] = useState(false)

   const uploadImageFun = async () => {
      setLoadOn(true)
      const response = await uploadImageAPI(uploadStageId, date, inputImage)
      setLoadOn(false)
      if (response.success) {
         toast.success(response.message)
         setUploadEnable(false)
      } else {
         toast.error(response.message)
      }
   }


   return (
      <>
         <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50">
               <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
                  Upload Image
               </h2>
               <div className="space-y-6">
                  <div>
                     <label htmlFor="statusDate" className="block text-sm font-medium text-gray-200 mb-1">
                        Status Changed Date
                     </label>
                     <input
                        id="statusDate"
                        type="date"
                        className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                        placeholder="Select status changed date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                     />
                  </div>
                  {count.map((element) => {
                     return (
                        <input
                           aria-label="image upload"
                           id={`file-upload`}
                           type="file"
                           accept="image/*"
                           className="w-30 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-teal-500 file:text-white file:hover:bg-teal-600"
                           onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                 const file = [...inputImage, e.target.files[0]]
                                 setInputImage(file);
                              }
                           }}
                        />
                     )
                  })}
                  <button onClick={() => setCount([...count, 0])} className="text-white">+ Add Image</button>


                  <div className="flex justify-end gap-4">
                     <button
                        type="button"
                        className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                        onClick={() => setUploadEnable(false)}
                     >
                        Cancel
                     </button>
                     <button
                        type="button"
                        className="bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                        onClick={uploadImageFun}
                     >
                        Confirm
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {loadOn && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50">
              <Loading />
            </div>
          )}
      </>
   )
}

export default ImageUpload