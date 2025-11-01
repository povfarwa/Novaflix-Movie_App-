import { useState } from "react";

import t1 from "./Trending/t1.jpg";
import t2 from "./Trending/t2.jpg";
import t3 from "./Trending/t3.jpg";
import t4 from "./Trending/t4.jpg";
import t5 from "./Trending/t5.jpg";

import f1 from "./Family/f1.jpg";
import f2 from "./Family/f2.jpg";
import f3 from "./Family/f3.jpg";
import f4 from "./Family/f4.jpg";
import f5 from "./Family/f5.jpg";

const Ui = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const trendingMovies = [
    { img: t5, name: "Interstellar" },
    { img: t1, name: "Enola Holmes" },
    { img: t2, name: "Pirates of the Caribbean" },
    { img: t3, name: "The Wild Robot" },
    { img: t4, name: "Black Widow" },
  ];

  const familyMovies = [
    { img: f1, name: "Encanto" },
    { img: f2, name: "The Lion King" },
    { img: f3, name: "Finding Nemo" },
    { img: f4, name: "Coco" },
    { img: f5, name: "Frozen" },
  ];

  const fetchMovies = async () => {
    if (!query.trim()) {
      // if search bar is empty, reset page
      setSearched(false);
      setMovies([]);
      return;
    }

    setLoading(true);
    setSearched(true);
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=903a6b5a&s=${query}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Detect when input is cleared manually
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSearched(false);
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C2B4E] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#1A3D64] px-10 py-4 shadow-md">
        <div className="text-2xl font-serif font-bold tracking-wide">
          NovaFlix
        </div>
        <ul className="flex gap-6 font-semibold">
          <li className="hover:text-[#8ACCD5] cursor-pointer transition">Home</li>
          <li className="hover:text-[#8ACCD5] cursor-pointer transition">About Us</li>
          <li className="hover:text-[#8ACCD5] cursor-pointer transition">Contact Us</li>
        </ul>
        <button className="bg-white text-[#1A3D64] px-4 py-2 rounded-lg font-medium hover:bg-[#8ACCD5] hover:text-[#0C2B4E] transition duration-200">
          Sign In
        </button>
      </nav>

      {/* Search Box */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search movies..."
          className="w-72 p-2 rounded-md border border-[#8ACCD5] bg-[#0C2B4E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ACCD5]"
        />
        <button
          onClick={fetchMovies}
          className="ml-2 bg-[#8ACCD5] text-[#0C2B4E] px-4 py-2 rounded-md hover:bg-white hover:text-[#1A3D64] transition"
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#8ACCD5] border-solid"></div>
        </div>
      )}

      {/* Search Results */}
      {!loading && searched && (
        <div className="px-10 mt-10">
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="relative group rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-full h-80 object-cover brightness-75 group-hover:brightness-50 transition duration-300"
                  />
                  <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
                    {movie.Title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-300 text-lg mt-10">
              No movies found.
            </p>
          )}
        </div>
      )}

      {/* Trending and Family Movies - show only when no search */}
      {!searched && !loading && (
        <>
          {/* Trending Movies */}
          <section className="mt-16 px-10">
            <h1 className="text-2xl font-bold text-white mb-5">
              🔥 Trending Movies
            </h1>
            <div className="flex flex-wrap justify-center gap-10">
              {trendingMovies.map((movie, index) => (
                <div
                  key={index}
                  className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                >
                  <img
                    src={movie.img}
                    alt={movie.name}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <p className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {movie.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Family / Kids Movies */}
          <section className="mt-16 px-10 pb-10">
            <h1 className="text-2xl font-bold text-white mb-5">
              🎬 Family & Kids Movies
            </h1>
            <div className="flex flex-wrap justify-center gap-10">
              {familyMovies.map((movie, index) => (
                <div
                  key={index}
                  className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                >
                  <img
                    src={movie.img}
                    alt={movie.name}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <p className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {movie.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Ui;
