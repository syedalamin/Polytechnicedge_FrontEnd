"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const OrderHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Orders</Text>
      <Text variant="body" color="secondary">View your order history</Text>
    </div>
  </div>
);
export default OrderHeader;
