import { FaShippingFast, FaUndo, FaLock } from "react-icons/fa";

const FeatureSection = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        {/* Feature 1 */}
        <div className="flex flex-col items-center space-y-2">
          <FaShippingFast className="text-2xl" />
          <h3 className="font-semibold tracking-wide">
            FREE INTERNATIONAL SHIPPING
          </h3>
          <p className="text-sm text-gray-600">
            On all orders over $100.00
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center space-y-2">
          <FaUndo className="text-2xl" />
          <h3 className="font-semibold tracking-wide">
            45 DAYS RETURN
          </h3>
          <p className="text-sm text-gray-600">
            Money back guarantee
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center space-y-2">
          <FaLock className="text-2xl" />
          <h3 className="font-semibold tracking-wide">
            SECURE CHECKOUT
          </h3>
          <p className="text-sm text-gray-600">
            100% secured checkout process
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;