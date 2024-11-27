USE ARTGALLERY
GO

DROP TABLE IF EXISTS [reviews]
DROP TABLE IF EXISTS [connections]
DROP TABLE IF EXISTS [bid_order_user]
DROP TABLE IF EXISTS [product_attributes_products]
DROP TABLE IF EXISTS [wishlist_products]
DROP TABLE IF EXISTS [wishlist_users]
DROP TABLE IF EXISTS [cart_item_products]
DROP TABLE IF EXISTS [order_item_products]
DROP TABLE IF EXISTS [bid_order]
DROP TABLE IF EXISTS [order_item]
DROP TABLE IF EXISTS [order_details]
DROP TABLE IF EXISTS [cart_item]
DROP TABLE IF EXISTS [cart]
DROP TABLE IF EXISTS [wishlist]
DROP TABLE IF EXISTS [product_attributes]
DROP TABLE IF EXISTS [products]
DROP TABLE IF EXISTS [categories]
DROP TABLE IF EXISTS [addresses]
DROP TABLE IF EXISTS wards
DROP TABLE IF EXISTS districts
DROP TABLE IF EXISTS provinces
DROP TABLE IF EXISTS [sellers] 
DROP TABLE IF EXISTS [users]
GO

CREATE TABLE [users] (
  [id] integer PRIMARY KEY IDENTITY,
  [role] integer,
  [avatar] nvarchar(255),
  [first_name] nvarchar(255),
  [last_name] nvarchar(255),
  [username] nvarchar(255) NOT NULL,
  [email] nvarchar(255) UNIQUE NOT NULL,
  [password] nvarchar(255),
  [gender] integer,
  [status] bit,
  [birth_of_date] datetime,
  [phone_number] nvarchar(255),
  [reset_password_token] nvarchar(255),
  [reset_password_expiry] datetime,
  [created_at] datetime NOT NULL,
  [deleted_at] datetime
)
GO
CREATE TABLE connections
(
	id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
	userId integer NOT NULL,
	signalrId nvarchar(22) NOT NULL,
	timeStamp datetime NOT NULL
	FOREIGN KEY (userId) REFERENCES [users](id)
)
GO
CREATE TABLE [sellers](
	[id] int primary key,
	[income] float,
	[created_at] datetime NOT NULL,
	[deleted_at] datetime,
	FOREIGN KEY ([id]) REFERENCES  [users]([id])
)

CREATE TABLE [addresses] (
  [id] integer PRIMARY KEY IDENTITY,
  [user_id] integer,
  [name] nvarchar(255),
  [address_line] nvarchar(255),
  [province_code] nvarchar(20),
  [district_code] nvarchar(20),
  [ward_code] nvarchar(20),
  [postal_code] nvarchar(255),
  [phone_number] nvarchar(255),
  [created_at] datetime NOT NULL,
  [deleted_at] datetime
)
GO

CREATE TABLE [categories] (
  [id] integer PRIMARY KEY IDENTITY,
  [name] nvarchar(255),
  [description] nvarchar(255),
  [created_at] datetime NOT NULL,
  [deleted_at] datetime
)
GO

CREATE TABLE [products] (
  [id] integer PRIMARY KEY IDENTITY,
  [seller_id] integer,
  [name] nvarchar(255),
  [type] integer,
  [description] nvarchar(500),
  [category_id] integer, 
  [price] Float,
  [quantity] integer,
  [image] nvarchar(255),
  [created_at] datetime NOT NULL,
  [deleted_at] datetime
)
GO

CREATE TABLE [product_attributes] (
  [id] integer PRIMARY KEY IDENTITY,
  [type] nvarchar(255) NOT NULL,
  [value] nvarchar(255),
  [created_at] datetime,
  [deleted_at] datetime
)
GO

CREATE TABLE [wishlist] (
  [id] integer PRIMARY KEY IDENTITY,
  [name] nvarchar(255),
  [user_id] integer,
  [product_id] integer,
  [created_at] datetime NOT NULL,
  [deleted_at] datetime
)
GO

CREATE TABLE [cart] (
  [id] integer PRIMARY KEY ,
  [total] FLOAT,
  [created_at] datetime NOT NULL,
  [updated_at] datetime
)
GO

CREATE TABLE [cart_item] (
	[id] integer PRIMARY KEY IDENTITY,
	[cart_id] integer,
	[product_id] integer,
	[quantity] integer,
	[created_at] datetime NOT NULL,
	[updated_at] datetime
)
GO

CREATE TABLE [order_details] (
	[id] integer PRIMARY KEY IDENTITY,
	[user_id] integer,
	[total] FLOAT,  
	[created_at] datetime NOT NULL,
	[updated_at] datetime
)
GO

CREATE TABLE [order_item] (
	[id] integer PRIMARY KEY IDENTITY,
	[order_id] integer,
	[product_id] integer,
	[quantity] integer,
	[created_at] datetime NOT NULL,
	[updated_at] datetime
)
GO


CREATE TABLE [bid_order] (
	[id] integer PRIMARY KEY IDENTITY,
	[product_id] integer,
	[bid_start_time] datetime,
	[bid_end_time] datetime,
	[bid_base_price] FLOAT,  
	[bid_sold_price] FLOAT,  
	[increment_in_price] FLOAT,  
	[increment_in_time] time,
	
	[bid_stamp] timestamp,
)
GO
CREATE TABLE [bid_order_user](
	[id] integer Identity,
	[bid_order_user_id] integer,
	[user_id] integer,
	[bid_transaction_time] datetime,
	[bid_transaction_amount] FLOAT,  
	PRIMARY KEY ([id])
)
ALTER TABLE [bid_order_user] ADD FOREIGN KEY ([bid_order_user_id]) REFERENCES [bid_order] ([id]);
ALTER TABLE [bid_order_user] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id]);
GO
CREATE TABLE [reviews](
	[id] integer PRIMARY KEY IDENTITY,
	[product_id] integer,
	[user_id] integer,
	[rating] integer,
	[review_text] nvarchar(255),
	[created_at] datetime
)
GO
CREATE TABLE provinces 
(
	[code] nvarchar(20) NOT NULL,
	[name] nvarchar(255) NOT NULL,
	[name_en] nvarchar(255) NULL,
	[full_name] nvarchar(255) NOT NULL,
	[full_name_en] nvarchar(255) NULL,
	[code_name] nvarchar(255) NULL,
	CONSTRAINT provinces_pkey PRIMARY KEY ([code])
);
GO
CREATE TABLE districts (
	[code] nvarchar(20) NOT NULL,
	[name] nvarchar(255) NOT NULL,
	[name_en] nvarchar(255) NULL,
	[full_name] nvarchar(255) NULL,
	[full_name_en] nvarchar(255) NULL,
	[code_name] nvarchar(255) NULL,
	[province_code] nvarchar(20) NULL,
	CONSTRAINT districts_pkey PRIMARY KEY ([code])
);
GO
ALTER TABLE districts ADD CONSTRAINT districts_province_code_fkey FOREIGN KEY (province_code) REFERENCES provinces(code);

CREATE TABLE wards (
	[code] nvarchar(20) NOT NULL,
	[name] nvarchar(255) NOT NULL,
	[name_en] nvarchar(255) NULL,
	[full_name] nvarchar(255) NULL,
	[full_name_en] nvarchar(255) NULL,
	[code_name] nvarchar(255) NULL,
	[district_code] nvarchar(20) NULL,
	CONSTRAINT wards_pkey PRIMARY KEY (code)
);
ALTER TABLE wards ADD CONSTRAINT wards_district_code_fkey FOREIGN KEY (district_code) REFERENCES districts(code);

ALTER TABLE [addresses] ADD CONSTRAINT addresses_province_code_fkey FOREIGN KEY (province_code) REFERENCES provinces(code);
ALTER TABLE [addresses] ADD CONSTRAINT addresses_district_code_fkey FOREIGN KEY (district_code) REFERENCES districts(code);
ALTER TABLE [addresses] ADD CONSTRAINT addresses_ward_code_fkey FOREIGN KEY (ward_code) REFERENCES wards(code);

ALTER TABLE [reviews] ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY ([product_id]) REFERENCES [products]([id]);
ALTER TABLE [reviews] ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY ([user_id]) REFERENCES [users]([id]);

ALTER TABLE [addresses] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
ALTER TABLE [bid_order] ADD FOREIGN KEY ([product_id]) REFERENCES [products] ([id])
ALTER TABLE [products] ADD FOREIGN KEY ([category_id]) REFERENCES [categories] ([id]) 

CREATE TABLE [product_attributes_products] (
[product_attributes_id] integer,
[products_id] integer,
PRIMARY KEY ([product_attributes_id], [products_id])
);
ALTER TABLE [product_attributes_products] ADD FOREIGN KEY ([product_attributes_id]) REFERENCES [product_attributes] ([id]);
ALTER TABLE [product_attributes_products] ADD FOREIGN KEY ([products_id]) REFERENCES [products] ([id]);
GO


ALTER TABLE [products] ADD FOREIGN KEY ([seller_id]) REFERENCES [sellers] ([id])
GO


ALTER TABLE [wishlist] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id]);
GO

CREATE TABLE [wishlist_products] (
	[wishlist_product_id] integer,
	[products_id] integer,
	PRIMARY KEY ([wishlist_product_id], [products_id])
);
GO

ALTER TABLE [wishlist_products] ADD FOREIGN KEY ([wishlist_product_id]) REFERENCES [wishlist] ([id]);
GO

ALTER TABLE [wishlist_products] ADD FOREIGN KEY ([products_id]) REFERENCES [products] ([id]);
GO

ALTER TABLE [cart] ADD FOREIGN KEY ([id]) REFERENCES [users] ([id])
GO

ALTER TABLE [cart_item] ADD FOREIGN KEY ([cart_id]) REFERENCES [cart] ([id])
GO

CREATE TABLE [cart_item_products] (
	[cart_item_product_id] integer,
	[products_id] integer,
	PRIMARY KEY ([cart_item_product_id], [products_id])
);
GO

ALTER TABLE [cart_item_products] ADD FOREIGN KEY ([cart_item_product_id]) REFERENCES [cart_item] ([id]);
GO

ALTER TABLE [cart_item_products] ADD FOREIGN KEY ([products_id]) REFERENCES [products] ([id]);
GO


ALTER TABLE [order_item] ADD FOREIGN KEY ([order_id]) REFERENCES [order_details] ([id])
GO

CREATE TABLE [order_item_products] (
	[order_item_product_id] integer,
	[products_id] integer,
	PRIMARY KEY ([order_item_product_id], [products_id])
);
GO

ALTER TABLE [order_item_products] ADD FOREIGN KEY ([order_item_product_id]) REFERENCES [order_item] ([id]);
GO

ALTER TABLE [order_item_products] ADD FOREIGN KEY ([products_id]) REFERENCES [products] ([id]);
GO
