import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Menu, X } from "lucide-react";
import logo from '../assets/logo.svg';
import { Button, Dropdown } from "flowbite-react";
import useAuthStore from "../store/useAuthStore";
import { getUser } from "../api/auth/AuthApi";

const Navbar = () => {
    const { logout, isAuthenticated } = useAuthStore();
    const [user, setUser] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                try {
                    const userData = await getUser();
                    setUser(userData.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUser();
    }, [isAuthenticated]);

    return (
        <header className="transition-all duration-500">
            <div className="flex items-center justify-between mx-5 sm:mx-32 py-5  transition-all duration-500">
                <div className="flex items-center justify-between gap-4 md:gap-14">
                    <Link to={'/'}>
                        <div className="flex items-center">
                            <img src={logo} alt="Freshly" className="h-10" />
                            <h2 className="text-2xl px-3 font-medium">Freshly</h2>
                        </div>
                    </Link>
                    <div className="hidden font-medium md:flex items-center gap-10">
                        <Link to={'/'}>Recipe</Link>
                        <Link to={'/'}>Categories</Link>
                        <Link to={'/'}>Favorites</Link>
                        <Link to={'/'}>Lists</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button as={Link} to={'/add-recipe'} className="bg-[#ec4700] focus:ring-0" pill>
                        <Plus size={20} color="white" />
                        <span className="hidden lg:inline-block pl-2">Add Recipe</span>
                    </Button>
                    {/* Avatar */}
                    <Dropdown
                        label={
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src={isAuthenticated && user ? user.displayPicture : logo}
                                    alt={isAuthenticated && user ? user.username : "Profile Picture"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        }
                        arrowIcon={false}
                        className="bg-[#fdfaf5] font-medium shadow-2xl rounded-3xl"
                        inline
                    >
                        {isAuthenticated ? (
                            <>
                                <Dropdown.Header>
                                    {/* Use optional chaining to prevent errors */}
                                    <span className="block text-lg font-bold">{user?.username || 'Guest'}</span>
                                    <span className="block truncate text-sm font-black">{user?.email || 'No Email'}</span>
                                </Dropdown.Header>
                                <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/earnings">Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    className="focus:rounded-b-3xl hover:rounded-b-3xl"
                                    onClick={logout}
                                >
                                    Sign out
                                </Dropdown.Item>
                            </>
                        ) : (
                            <>
                                <Dropdown.Item className="focus:rounded-t-3xl hover:rounded-t-3xl max-w-lg" as={Link} to="/signin">
                                    Sign in
                                </Dropdown.Item>
                                <Dropdown.Item className="focus:rounded-b-3xl hover:rounded-b-3xl" as={Link} to="/signup">
                                    Sign up
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-md"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden flex flex-col items-start px-12 py-2 transition-all duration-500 ease-in-out font-medium ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                <Link to={'/'} className="py-2">Recipe</Link>
                <Link to={'/'} className="py-2">Categories</Link>
                <Link to={'/'} className="py-2">Favorites</Link>
                <Link to={'/'} className="py-2">Lists</Link>
            </div>
        </header>
    );
}

export default Navbar;