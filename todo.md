# For super admin

actions like create transactions and create, delete and deny deposit request wont be avaiable

# For admins

Dashboard
Reports
Tickets // all saved tickets and placed tickets that belong to the shop
shopWithAdminId = shops.find(adminId === currentUser.\_id)
Users // only the ones which are customers or cashiers of shop (role === cashier && user.belongsToShop === shopWithAdminId.\_id)
Transactions // actions like create transactions and create, delete and deny deposit request wont be avaiable

# For cashier

Tickets  
Transactions
deposit request // visible depending on cashier permission
transactions table
make deposit // visible depending on cashier permission
make withdrawal // visible depending on cashier permission
