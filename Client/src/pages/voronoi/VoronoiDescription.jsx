//==============================================================================
// Filename: VoronoiDescription.jsx
// Author: Aaron Thompson
// Date Created: 6/4/2026
// Last Updated: 6/4/2026
//
// Description: Description section for the voronoi page.
//==============================================================================
// HTML FUNCTION(s)
//------------------------------------------------------------------------------
export default function VoronoiDescription() {
    return(
        <section className="descriptionSection">
            <h2 className="descriptionTitle">
                {"Voronoi Noise"}
            </h2>
            <p className="descriptionText">
                {
                    "Voronoi noise, also known as Worley noise, is a visual noise"
                    + " which has a cell-like appearance. The noise is a collection"
                    + " of random points, known as seed points, which are used to produce a Voronoi diagram."
                    + " This diagram is comprised of cells where every point existing"
                    + " in a cell is closer to the cell's seed point than any other."
                }
            </p>
        </section>
    );
}
//==============================================================================
//==============================================================================