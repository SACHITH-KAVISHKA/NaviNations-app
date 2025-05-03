const  Homa=() => {
  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
      <img 
        src="https://static.vecteezy.com/system/resources/previews/019/895/872/non_2x/world-map-in-one-line-art-concept-free-vector.jpg" 
        alt="World Map" 
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
    </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white">
        <div className="mt-6">
          <input
            icon="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for a country..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="absolute left-0 right-0 z-[-1] h-1/2 bg-gradient-to-t from-[#000000] to-transparent"></div>
      
    </>
  );
    
}

export default Homa;