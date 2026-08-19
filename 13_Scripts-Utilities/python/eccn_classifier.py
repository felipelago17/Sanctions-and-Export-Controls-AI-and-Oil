#!/usr/bin/env python3
"""
ECCN Classifier for Agentic AI Systems
Implements the decision tree from 09_ECCN-Classification-Framework/agentic-ai-models-ECCN-decision-tree.md
"""

from __future__ import annotations
import json
import sys
from dataclasses import dataclass
from enum import Enum
from typing import Optional


class ItemType(Enum):
    MODEL_WEIGHTS = "model_weights"
    HARDWARE = "hardware"
    SOFTWARE = "software"
    TECHNOLOGY = "technology"


class CountryTier(Enum):
    TIER_1 = "tier_1"   # US allies; NLR for most AI items
    TIER_2 = "tier_2"   # ~120 countries; TDP required
    TIER_3 = "tier_3"   # D:1/D:5; license required; policy of denial


TIER_3_COUNTRIES = {
    "CN", "RU", "IR", "KP", "BY", "CU", "VE", "SY"
}

TIER_1_COUNTRIES = {
    "US", "GB", "DE", "FR", "JP", "KR", "AU", "CA", "NZ", "IL", "TW",
    "BE", "NL", "SE", "NO", "DK", "FI", "IT", "ES", "PT", "AT", "CH",
    "PL", "CZ", "HU", "SK", "SI", "EE", "LV", "LT", "LU", "MT", "CY",
    "GR", "HR", "RO", "BG", "IE", "IS", "SG"
}


@dataclass
class ClassificationResult:
    item_description: str
    item_type: ItemType
    eccn: str
    confidence: str  # high / medium / low
    license_required_for: list[str]  # country tiers requiring a license
    deemed_export_risk: bool
    rationale: str
    action_required: list[str]


def classify_ai_model_weights(
    training_flop: Optional[float],
    benchmark_rank_percentile: Optional[float],
    is_open_weight: bool,
    principal_nationality: Optional[str] = None
) -> ClassificationResult:
    """
    Classify AI model weights under the EAR (AI Diffusion Rule, Jan 15 2025).

    Args:
        training_flop: Total training compute in FLOP (FP8 equivalent)
        benchmark_rank_percentile: Percentile ranking on standard benchmarks (0-100)
        is_open_weight: Whether model weights are publicly available
        principal_nationality: ISO 3166-1 alpha-2 country code of accessing principal
    """
    FRONTIER_FLOP_THRESHOLD = 1e26
    FRONTIER_BENCHMARK_THRESHOLD = 90.0
    NEAR_FRONTIER_FLOP_THRESHOLD = 1e23

    is_frontier = (
        (training_flop is not None and training_flop >= FRONTIER_FLOP_THRESHOLD) or
        (benchmark_rank_percentile is not None and benchmark_rank_percentile >= FRONTIER_BENCHMARK_THRESHOLD)
    )
    is_near_frontier = (
        not is_frontier and
        training_flop is not None and training_flop >= NEAR_FRONTIER_FLOP_THRESHOLD
    )

    if is_frontier and not is_open_weight:
        # Closed frontier model — controlled
        license_required = [CountryTier.TIER_2.value, CountryTier.TIER_3.value]
        deemed_export = (
            principal_nationality is not None and
            principal_nationality not in TIER_1_COUNTRIES
        )
        return ClassificationResult(
            item_description="Frontier closed-weight AI model",
            item_type=ItemType.MODEL_WEIGHTS,
            eccn="5E002 / AI ECCN (TBD)",
            confidence="medium",  # AI ECCN not yet finalized
            license_required_for=license_required,
            deemed_export_risk=deemed_export,
            rationale=(
                f"Training compute {training_flop:.2e} FLOP meets frontier threshold "
                f"({FRONTIER_FLOP_THRESHOLD:.0e}); closed-weight → EAR controlled. "
                "AI Diffusion Rule three-tier framework applies."
            ),
            action_required=[
                "Obtain BIS ECCN classification opinion",
                "Screen all API users for restricted-party status",
                "Implement Tier 2 TDP authorization before API access",
                "Block API access for Tier 3 country principals without license",
                "Conduct deemed-export screening for foreign national employees",
                "Log all access per Woodward-Rogoyski provenance architecture"
            ]
        )

    if is_frontier and is_open_weight:
        return ClassificationResult(
            item_description="Frontier open-weight AI model",
            item_type=ItemType.MODEL_WEIGHTS,
            eccn="EAR99 (post-publication)",
            confidence="medium",
            license_required_for=[],
            deemed_export_risk=False,
            rationale=(
                "Frontier capability but open-weight publication makes weight control "
                "impracticable. Compliance focus shifts to compute/API and pre-publication controls."
            ),
            action_required=[
                "Pre-publication: obtain ECCN classification opinion before release",
                "Consider whether publication is appropriate given capability level",
                "Post-publication: monitor for distillation attack patterns",
                "Document publication decision for voluntary disclosure record"
            ]
        )

    if is_near_frontier:
        return ClassificationResult(
            item_description="Near-frontier AI model",
            item_type=ItemType.MODEL_WEIGHTS,
            eccn="EAR99 (monitor for reclassification)",
            confidence="low",
            license_required_for=[],
            deemed_export_risk=False,
            rationale=(
                f"Training compute {training_flop:.2e} FLOP is below frontier threshold "
                f"but above near-frontier threshold ({NEAR_FRONTIER_FLOP_THRESHOLD:.0e}). "
                "BIS has signaled downward threshold movement. Monitor for reclassification."
            ),
            action_required=[
                "Monitor BIS rulemaking for ECCN threshold changes",
                "Implement Woodward-Rogoyski Proposal 5 (continuous re-classification trigger)",
                "Conduct quarterly capability benchmark assessments",
                "Maintain readiness for rapid compliance implementation if threshold crossed"
            ]
        )

    # Below near-frontier
    return ClassificationResult(
        item_description="Below-threshold AI model",
        item_type=ItemType.MODEL_WEIGHTS,
        eccn="EAR99",
        confidence="high",
        license_required_for=[],
        deemed_export_risk=False,
        rationale=(
            "Model compute and capability are below both frontier and near-frontier thresholds. "
            "EAR99 unless hardware or software components are separately controlled."
        ),
        action_required=[
            "Standard restricted-party screening (SDN/Entity List) for all transactions",
            "Verify that associated hardware/software is also EAR99 or licensed"
        ]
    )


def get_country_tier(iso2: str) -> CountryTier:
    """Return the AI Diffusion Rule country tier for a given ISO 3166-1 alpha-2 code."""
    if iso2.upper() in TIER_3_COUNTRIES:
        return CountryTier.TIER_3
    if iso2.upper() in TIER_1_COUNTRIES:
        return CountryTier.TIER_1
    return CountryTier.TIER_2


def check_deemed_export(tool_eccn: str, principal_nationality: str) -> dict:
    """
    Evaluate whether a tool access event constitutes a deemed export.

    Args:
        tool_eccn: ECCN of the tool being accessed
        principal_nationality: ISO 3166-1 alpha-2 country code of the principal

    Returns:
        dict with 'deemed_export' (bool), 'tier' (CountryTier), 'action_required' (str)
    """
    tier = get_country_tier(principal_nationality)
    ear99_eccns = {"EAR99", "ear99", "N/A", ""}

    if tool_eccn in ear99_eccns:
        return {
            "deemed_export": False,
            "tier": tier.value,
            "action_required": "No deemed-export licence required; conduct standard screening"
        }

    if tier == CountryTier.TIER_3:
        return {
            "deemed_export": True,
            "tier": tier.value,
            "action_required": (
                f"BLOCK: Tool {tool_eccn} access by Tier 3 national ({principal_nationality}) "
                "requires licence; policy of denial. Do not provide access without BIS authorisation."
            )
        }

    if tier == CountryTier.TIER_2:
        return {
            "deemed_export": True,
            "tier": tier.value,
            "action_required": (
                f"REVIEW: Tool {tool_eccn} access by Tier 2 national ({principal_nationality}) "
                "may require deemed-export licence. Obtain BIS licence or TDP before access."
            )
        }

    # Tier 1
    return {
        "deemed_export": False,
        "tier": tier.value,
        "action_required": "Tier 1 national: no deemed-export licence required; maintain access log"
    }


def main():
    """CLI entry point: classify from command-line arguments."""
    import argparse
    parser = argparse.ArgumentParser(description="ECCN Classifier for Agentic AI")
    parser.add_argument("--flop", type=float, help="Training FLOP (FP8 equivalent)")
    parser.add_argument("--benchmark-pct", type=float, help="Benchmark percentile (0-100)")
    parser.add_argument("--open-weight", action="store_true", help="Open-weight model")
    parser.add_argument("--nationality", type=str, help="Principal nationality (ISO 3166-1 alpha-2)")
    parser.add_argument("--tool-eccn", type=str, help="Check deemed export for tool ECCN")
    args = parser.parse_args()

    if args.tool_eccn and args.nationality:
        result = check_deemed_export(args.tool_eccn, args.nationality)
        print(json.dumps(result, indent=2))
        return

    result = classify_ai_model_weights(
        training_flop=args.flop,
        benchmark_rank_percentile=args.benchmark_pct,
        is_open_weight=args.open_weight,
        principal_nationality=args.nationality
    )
    print(json.dumps({
        "item_description": result.item_description,
        "eccn": result.eccn,
        "confidence": result.confidence,
        "license_required_for": result.license_required_for,
        "deemed_export_risk": result.deemed_export_risk,
        "rationale": result.rationale,
        "action_required": result.action_required
    }, indent=2))


if __name__ == "__main__":
    main()
