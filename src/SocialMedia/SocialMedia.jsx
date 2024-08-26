

export default function SocialMedia() {
    return (
      <>
        <div className="icons ">
          <ul className="flex space-x-3 ">
            <li>
              <i className="cursor-pointer hover:text-[#bcf06d] transition-all fab fa-facebook-f "></i>
            </li>
            <li>
              <i className="transition-all cursor-pointer hover:text-[#bcf06d] fab fa-twitter "></i>
            </li>
            <li>
              <i className="transition-all cursor-pointer hover:text-[#bcf06d] fab fa-linkedin "></i>
            </li>
            <li>
              <i className="transition-all cursor-pointer hover:text-[#bcf06d] fab fa-instagram"></i>
            </li>
            <li>
              <i className="transition-all cursor-pointer hover:text-[#bcf06d] fab fa-youtube"></i>
            </li>
          </ul>
        </div>
      </>
    );
}
