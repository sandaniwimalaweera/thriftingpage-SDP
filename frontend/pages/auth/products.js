import { useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, TextField, Box } from "@mui/material";

const products = [
  { id: 1, name: "Ladies Top", price: 2000, oldPrice: 2400, seller: "Kevin Storm", size: "M", condition: "Not used", image: "/img21.jfif" },
  { id: 2, name: "Men Short", price: 2000, oldPrice: 2400, seller: "Kevin Storm", size: "M", condition: "Not used", image: "/img22.jfif" },
  { id: 3, name: "Frock", price: 2000, oldPrice: 2400, seller: "Kevin Storm", size: "M", condition: "Not used", image: "/img20.jfif" },
  { id: 4, name: "Tight Frock", price: 2000, oldPrice: 2400, seller: "Kevin Storm", size: "M", condition: "Not used", image: "/img22.jfif" },
];

export default function ProductSection() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia component="img" height="60" image={product.image} alt={product.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="bold">{product.name}</Typography>
                <Typography variant="body2">Size: {product.size}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <s>LKR {product.oldPrice}</s> <strong>LKR {product.price}</strong>
                </Typography>
                <Typography variant="body2" color="primary">seller: {product.seller}</Typography>
                <Typography variant="body2" color="error" fontWeight="bold">{product.condition}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
