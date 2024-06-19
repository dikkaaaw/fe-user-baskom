import { Link } from "react-router-dom";
import FAQSection from "../../components/FAQ/FAQSection";
import officeImg from "../../assets/about-us.jpg";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Rakannanda Erdy Suprapto",
      image: "https://via.placeholder.com/150",
      description: "Scrum Master",
    },
    {
      name: "Muhammad Riski Febrianto",
      image: "https://via.placeholder.com/150",
      description: "Product Manager",
    },
    {
      name: "Martinus Juan Prasetyo",
      image: "https://via.placeholder.com/150",
      description: "Backend Developer",
    },
    {
      name: "Dika Wicaksono",
      image: "https://via.placeholder.com/150",
      description: "Frontend Developer",
    },
    {
      name: "Mutia Zahirma",
      image: "https://via.placeholder.com/150",
      description: "UI/UX Designer",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen font-sans leading-normal tracking-normal bg-gray-100">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
        {/* Mini Navbar */}
        <nav className="mb-8 bg-white rounded-lg">
          <div className="container flex items-center justify-center p-4 me-8">
            <div className="text-lg font-semibold">
              <Link to="/" className="mx-4 text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/about-us"
                className="mx-4 text-gray-700 hover:text-gray-900"
              >
                About Us
              </Link>
              <Link
                to="/profile"
                className="mx-4 text-gray-700 hover:text-gray-900"
              >
                Profile
              </Link>
            </div>
          </div>
        </nav>

        <section className="my-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">ABOUT US.</h1>
          <p className="px-4 mx-auto text-lg leading-relaxed text-center md:px-24 lg:px-48">
            <b>BasKom</b>, atau <b>Barang Bekas Amikom</b>, didirikan pada tahun
            2024 dengan visi menciptakan platform yang aman dan terpercaya bagi
            komunitas Amikom dalam bertransaksi barang bekas. Sebagai aplikasi
            pihak ketiga, BasKom mempertemukan penjual dan pembeli, memastikan
            setiap transaksi berjalan lancar dan adil.
          </p>
        </section>

        <div className="flex justify-center mb-4">
          <img
            src={officeImg}
            alt="Office Image"
            className="w-full max-w-4xl rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center">
          <blockquote className="text-xl italic font-semibold">
            “Our work does make sense only if it is a <br /> faithful witness of
            his time.”
          </blockquote>
          <p className="mt-4">Mahatma Gandhi</p>
        </div>

        <section className="my-12">
          <h2 className="mt-10 text-3xl font-bold text-center">THE TEAM.</h2>
          <p className="mb-8 text-lg text-center">
            These people work on making our product best.
          </p>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center my-4 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="p-4 md:w-1/3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="p-4 text-center md:w-2/3 md:text-left">
                <h3 className="mb-2 text-2xl font-bold">{member.name}</h3>
                <p className="text-lg">
                  <i>{member.description}</i>
                </p>
              </div>
            </div>
          ))}
        </section>

        <FAQSection />
      </div>
    </div>
  );
};

export default AboutUs;
