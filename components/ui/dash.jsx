
import "bootstrap-icons/font/bootstrap-icons.css";
export default function Dash(){
    return(
        <>
        <div className="flex h-screen fixed">
  <div className="bg-gray-300  p-4 border-r border-gray-200 min-w-[200px] ">
    <nav className="space-y-2">
      <div className="font-semibold text-gray-700  mb-2 ml-9">Admin space</div>
      <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-800 before:me-6 after:flex-1 after:border-t after:border-gray-800 after:ms-6 "><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>

      <div
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200  transition-colors"

      >
        <i className="fs-4 bi-people text-gray-700"></i>
        <span className="font-medium text-gray-700 ">Users</span>
      </div>
 
      <div
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200  transition-colors"
      
      >
        <i className="fs-4 text-gray-700 bi-card-text"></i>
        <span className="font-medium text-gray-700">Incident</span>
      </div>

      <button
        type="button"
        id="radix-:rd:"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
        className="flex flex-col items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        <div>
        <i className="fs-4 bi-columns text-gray-700"></i>
        <span className="font-medium px-3 text-gray-700 ">Teams</span></div>
      </button>
      <div 
        className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        <i className="fs-4 bi-power text-gray-700 "></i>
        <span className="font-medium text-gray-700 ">Log out</span>
      </div>
      
    </nav>
  </div>
  
</div>
      </>
    )

}
