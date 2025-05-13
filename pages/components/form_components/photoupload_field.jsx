import { AlertTriangle, Upload, X } from "lucide-react"
import { useRef } from "react"

const PhotoUpload = ({ 
  title = "Photos",
  photos = [], 
  setPhotos, 
  maxPhotos = 3, 
  error = null,
  required = false,
  comment = null
}) => {
  const fileInputRef = useRef(null)
  
  const handleClick = () => {
    fileInputRef.current.click()
  }
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (photos.length + selectedFiles.length > maxPhotos) {
      alert(`You can only upload a maximum of ${maxPhotos} photos.`)
      return
    }
  
    const newPhotos = [...photos]
  
    selectedFiles.forEach((file) => {
      // Create a preview URL for the file
      const reader = new FileReader()
      reader.onloadend = () => {
        newPhotos.push({
          file,
          preview: reader.result,
        })
        setPhotos([...newPhotos])
      }
      reader.readAsDataURL(file)
    })
  }
  
  const removePhoto = (index) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }
  
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}
  
      <div className="relative">
        <div className="border border-none bg-neutral-100 dark:bg-neutral-950 rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap gap-4 mb-4">
            {Array.isArray(photos) && photos.map((photo, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={photo.preview || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
  
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleClick}
              disabled={photos.length >= maxPhotos}
              className={`flex items-center text-sm text-primary-500 hover:text-blue-700 transition-colors ${
                photos.length >= maxPhotos ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Upload size={16} className="mr-2" />
              Add photos
            </button>
            <span className="ml-4 text-xs text-neutral-500 dark:text-neutral-300">Maximum {maxPhotos} photos</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>
        </div>
      </div>
  
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}

      {comment && !error && <div className="text-xs text-neutral-800 dark:text-neutral-300 mt-1">{comment}</div>}
    </div>
  )
}

export default PhotoUpload