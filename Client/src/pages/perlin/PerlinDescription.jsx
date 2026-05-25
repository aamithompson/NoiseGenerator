//==============================================================================
// Filename: PerlinDescription.jsx
// Author: Aaron Thompson
// Date Created: 5/24/2026
// Last Updated: 5/25/2026
//
// Description: Description section for the perlin page.
//==============================================================================
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function PerlinDescription() {
    return(
        <section className="descriptionSection">
            <h2 className="descriptionTitle">
                {"Perlin Noise"}
            </h2>
            <p className="descriptionText">
                {
                    "A type of gradient noise developed by the computer scientist"
                    +" Ken Perlin, designed to produce more natural-looking"
                    +" procedural textures. Perlin noise uses a permutation table"
                    +" which provides a hash mapping for lattice node indices to"
                    +" gradient vectors. The gradient at each surrounding corner"
                    +" produces a dot product with the distance vector spanning"
                    +" from that corner to the sample point. The resulting dot"
                    +" product values are then interpolated, weighted by the improved"
                    +" fade function 6t⁵ − 15t⁴ + 10t³, introduced in Perlin's 2002"
                    +" revision."
                }
            </p>
        </section>
    );
}
//==============================================================================
//==============================================================================