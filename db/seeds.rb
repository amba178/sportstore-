Product.delete_all 
# Order.delete_all 
# User.delete_all 

p1=Product.create(:name => 'Kayak', :description => "A boat for one person", price: 275, category: 'Watersports')
p2=Product.create(:name => 'Lifejack', :description => "Protective and fashionable", price: 48.95, category: 'Watersports')
p3=Product.create(:name => 'Soccer Ball', :description => "FIFA-approved size and weight", price: 19.5, category: 'Soccer')
p4=Product.create(:name =>'Corner Flags', :description => "Give your playing field a professional touch", price: 34.95, category:'Soccer')
p5=Product.create(:name => 'Stadium', :description => "Flat-packed 35,000-seat stadium", price: 79500.00, category: 'Soccer')
p6=Product.create(:name => 'Thinking Cap', :description => "Improve your brain efficiency by 75%", price: 16, category: 'Chess')
p7=Product.create(:name =>'Unsteady Chair', :description => "Secretly give your opponent a disadvantage", price: 29.95, category: 'Chess')
p8=Product.create(:name => 'Human Chess Board', :description => "A fun game for the family", price: 75, category: 'Chess')
p9=Product.create(:name => 'Bling-Bling King', :description => "Gold-plated, diamond-studded King", price: 1200, category: 'Chess')

# order = Order.create(:name => "Salem Amba", street: "123 Weightman street", city: "San Diego", 
# 	      zip: "92105", :state => "CA", country: "United States of America", giftwrap: true) 
# order.products << p1
User.create(:password => "salimali178", :password_confirmation => "salimali178", :email => "salemamba@gmail.com", roles: ["admin"])
